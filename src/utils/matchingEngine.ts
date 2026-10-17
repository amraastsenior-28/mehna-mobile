/**
 * MEHNA Matching Engine (Phase 0 Simulated Engine)
 * 
 * Theoretical Foundation:
 * Grounded in Gary Dessler's Human Resource Management Selection Theory and Job Analysis principles.
 * Evaluates Person-Job Fit by algorithmically calculating congruence across Knowledge, Skills, Abilities,
 * and Other characteristics (KSAOs).
 * 
 * Formula:
 * Skill Match Score = w1 * Knowledge + w2 * PracticalSkills + w3 * Abilities + w4 * Contextual
 * Default Weights:
 * w1 (Knowledge) = 0.30
 * w2 (Practical Skills) = 0.35
 * w3 (Abilities) = 0.20
 * w4 (Contextual / Other KSAOs) = 0.15
 * 
 * Note: This modular service is intentionally isolated so it can later be substituted with the Phase 2
 * backend service without refactoring the presentation layer.
 */

export interface KSAOScores {
  knowledge: number;        // e.g. 0 - 100
  practicalSkills: number;  // e.g. 0 - 100
  abilities: number;        // e.g. 0 - 100
  contextual: number;       // e.g. 0 - 100
}

export interface MatchingWeights {
  knowledgeWeight: number;       // w1
  practicalSkillsWeight: number; // w2
  abilitiesWeight: number;       // w3
  contextualWeight: number;      // w4
}

export const DEFAULT_MATCHING_WEIGHTS: MatchingWeights = {
  knowledgeWeight: 0.30,
  practicalSkillsWeight: 0.35,
  abilitiesWeight: 0.20,
  contextualWeight: 0.15,
};

/**
 * Computes the composite Person-Job Fit score between candidate KSAOs and vacancy requirements.
 */
export function calculateSkillMatchScore(
  candidateKSAO: KSAOScores,
  weights: MatchingWeights = DEFAULT_MATCHING_WEIGHTS
): number {
  const rawScore =
    weights.knowledgeWeight * candidateKSAO.knowledge +
    weights.practicalSkillsWeight * candidateKSAO.practicalSkills +
    weights.abilitiesWeight * candidateKSAO.abilities +
    weights.contextualWeight * candidateKSAO.contextual;

  // Clamp and round to nearest integer between 0 and 100
  return Math.min(100, Math.max(0, Math.round(rawScore)));
}
