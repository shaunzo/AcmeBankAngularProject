/**
 * For production this BASE_URL will need to change to the live endpoint
 */
const BASE_URL = 'http://localhost:8080/api';

export const environment = {
  production: true,
  global: {
    company_name: 'Acme Bank'
  },
  api: {
    accounts: `${BASE_URL}/accounts`
  }
};
