/* Dictionary like look-up object for user friendly messages */
export const ERROR_MESSAGES = {
  // Validation errors
  'Each scene ID must be a positive integer.':
    'Failed to start a game session. Please try again.',
 ' MISSING_FIELD': 'Failed to start a game session. Please try again.',
  'DATABASE_SCHEMA_ERROR': 'Failed to start a game session. Please try again.',

  // Not found errors
  'NOT_FOUND': 'This game does not exist any more. Please choose a different one.',
 'MISSING_RECORD': 'This game does not exist any more. Please choose a different one.',

  // Database errors
  'DATABASE_UNREACHABLE': 'Database error. Please try again.',
  'DATABASE_TIMEOUT': 'Database error. Please try again.',

  // Server or Network errors
  'NETWORK_TIMEOUT': 'Server or Network error. Please try again later.',
  'HOST_NOT_FOUND': 'Server or Network error. Please try again later.',
  'CONNECTION_REFUSED': 'Server or Network error. Please try again later.',
}
