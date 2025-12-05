import json
import os
from typing import Dict, Any, Optional
from datetime import datetime
from app.models.schemas import Severity

class RuleEngine:
    def __init__(self):
        self.rules = self._load_rules()
    
    def _load_rules(self) -> Dict[str, Any]:
        """Load medical rules from JSON file"""
        rules_path = os.path.join(os.path.dirname(__file__), 'rules.json')
        with open(rules_path, 'r') as f:
            return json.load(f)
    
    def evaluate_metric(
        self,
        metric_name: str,
        value: float,
        age: Optional[int] = None,
        gender: Optional[str] = None,
        is_pregnant: bool = False
    ) -> Dict[str, Any]:
        """
        Evaluate a metric value against medical rules
        Returns: {flag, severity, interpretation, rule_id}
        """
        metric_key = metric_name.lower().replace(' ', '_')
        
        if metric_key not in self.rules['metrics']:
            return {
                "flag": "UNKNOWN",
                "severity": Severity.GREEN,
                "interpretation": "No rules defined for this metric",
                "rule_id": None
            }
        
        metric_config = self.rules['metrics'][metric_key]
        applicable_rule = self._find_applicable_rule(
            metric_config['rules'],
            age,
            gender,
            is_pregnant
        )
        
        if not applicable_rule:
            return {
                "flag": "NO_RULE",
                "severity": Severity.GREEN,
                "interpretation": "No applicable rule found for this demographic",
                "rule_id": None
            }
        
        # Evaluate against ranges
        ref_low = applicable_rule.get('ref_low')
        ref_high = applicable_rule.get('ref_high')
        critical_low = applicable_rule.get('critical_low')
        critical_high = applicable_rule.get('critical_high')
        
        flag = "NORMAL"
        severity = Severity.GREEN
        interpretation_key = "normal"
        
        # Check critical ranges first
        if critical_low and value < critical_low:
            flag = "CRITICAL_LOW"
            severity = Severity.RED
            interpretation_key = "critical_low"
        elif critical_high and value > critical_high:
            flag = "CRITICAL_HIGH"
            severity = Severity.RED
            interpretation_key = "critical_high"
        elif ref_low and value < ref_low:
            flag = "LOW"
            severity = Severity.YELLOW
            interpretation_key = "low"
        elif ref_high and value > ref_high:
            flag = "HIGH"
            severity = Severity.YELLOW
            interpretation_key = "high"
        
        interpretation = metric_config['interpretation'].get(
            interpretation_key,
            "Value is within normal range"
        )
        
        return {
            "flag": flag,
            "severity": severity,
            "interpretation": interpretation,
            "rule_id": applicable_rule.get('condition'),
            "ref_low": ref_low,
            "ref_high": ref_high,
            "unit": metric_config['unit']
        }
    
    def _find_applicable_rule(
        self,
        rules: list,
        age: Optional[int],
        gender: Optional[str],
        is_pregnant: bool
    ) -> Optional[Dict[str, Any]]:
        """Find the most specific applicable rule"""
        for rule in rules:
            # Check age
            if 'age_min' in rule and (age is None or age < rule['age_min']):
                continue
            if 'age_max' in rule and (age is None or age > rule['age_max']):
                continue
            
            # Check gender
            if 'gender' in rule and gender != rule['gender']:
                continue
            
            # Check pregnancy
            if 'pregnant' in rule and is_pregnant != rule['pregnant']:
                continue
            
            return rule
        
        return None
    
    def get_rule_version(self) -> str:
        """Get current rule version"""
        return self.rules.get('version', '1.0.0')


# Singleton instance
rule_engine = RuleEngine()
