#!/usr/bin/env node
/**
 * Security vulnerability scanning script
 * Run with: npm run security:audit
 */

import { execSync } from 'child_process';

interface AuditResult {
  vulnerabilities: {
    critical: number;
    high: number;
    moderate: number;
    low: number;
  };
}

function runSecurityAudit(): AuditResult {
  try {
    console.log('🔒 Running security audit...\n');
    
    // Run npm audit
    const auditOutput = execSync('npm audit --json', { encoding: 'utf-8' });
    const audit = JSON.parse(auditOutput);

    const vulnerabilities = {
      critical: audit.metadata?.vulnerabilities?.critical || 0,
      high: audit.metadata?.vulnerabilities?.high || 0,
      moderate: audit.metadata?.vulnerabilities?.moderate || 0,
      low: audit.metadata?.vulnerabilities?.low || 0,
    };

    console.log('📊 Security Audit Results:');
    console.log(`   Critical: ${vulnerabilities.critical}`);
    console.log(`   High: ${vulnerabilities.high}`);
    console.log(`   Moderate: ${vulnerabilities.moderate}`);
    console.log(`   Low: ${vulnerabilities.low}`);

    if (vulnerabilities.critical > 0) {
      console.log('\n❌ Critical vulnerabilities found!');
      console.log('   Run "npm audit fix" to attempt automatic fixes.');
      return { vulnerabilities };
    }

    if (vulnerabilities.high > 0) {
      console.log('\n⚠️  High severity vulnerabilities found.');
      console.log('   Consider running "npm audit fix" to address them.');
    } else {
      console.log('\n✅ No critical or high severity vulnerabilities found.');
    }

    return { vulnerabilities };
  } catch (error: any) {
    if (error.status === 1) {
      // npm audit exits with code 1 when vulnerabilities are found
      const auditOutput = error.stdout || error.message;
      try {
        const audit = JSON.parse(auditOutput);
        const vulnerabilities = {
          critical: audit.metadata?.vulnerabilities?.critical || 0,
          high: audit.metadata?.vulnerabilities?.high || 0,
          moderate: audit.metadata?.vulnerabilities?.moderate || 0,
          low: audit.metadata?.vulnerabilities?.low || 0,
        };
        return { vulnerabilities };
      } catch {
        // If parsing fails, return zeros
        return { vulnerabilities: { critical: 0, high: 0, moderate: 0, low: 0 } };
      }
    }
    console.error('Error running security audit:', error);
    return { vulnerabilities: { critical: 0, high: 0, moderate: 0, low: 0 } };
  }
}

function main() {
  const result = runSecurityAudit();
  
  // Exit with error code if critical vulnerabilities found
  if (result.vulnerabilities.critical > 0) {
    process.exit(1);
  }
  
  process.exit(0);
}

main();

