import { test, expect } from '@playwright/test';

test('Não deve logar quando o código de autenticacao e invalido', async ({ page }) => {
  
  const usuario = {
    cpf: '00000014141',
    senha: '147258'
  }

  const msgError = await page.locator('span');
  const msgErrorMock = 'Código inválido. Por favor,';

  await page.goto('http://paybank-ms-auth:3000/');

  await page.getByRole('textbox', { name: 'Digite seu CPF' }).fill(usuario.cpf);
  await page.getByRole('button', { name: 'Continuar' }).click();

  for (const digito of usuario.senha) {
    await page.getByRole('button', { name: digito }).click();
  }
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByRole('textbox', { name: '000000' }).click();
  await page.getByRole('textbox', { name: '000000' }).fill('452257');
  await page.getByRole('button', { name: 'Verificar' }).click();

  await expect(msgError).toContainText(msgErrorMock);
});