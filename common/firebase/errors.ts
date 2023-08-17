export const handleErrorMessage = (error: unknown) => {
  if (!(error instanceof Error)) return JSON.stringify(error);
  if ('code' in error) {
    if (error.code === 'auth/code-expired') {
      return 'O código expirou. Volte à tela anterior e tente novamente.';
    }
    if (error.code === 'auth/invalid-verification-code') {
      return 'Código inválido. Verifique e tente novamente.';
    }
    if (error.code === 'auth/popup-closed-by-user') {
      return 'Validação interrompida. Volte à tela anterior e tente novamente.';
    }
    if (error.code === 'auth/too-many-requests') {
      return 'O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login. Tente novamente mais tarde.';
    }
    if (error.code === 'auth/invalid-phone-number' || error.code === 'auth/missing-phone-number') {
      return 'Telefone inválido. Verifique o número e tente novamente.';
    }
    if (error.code === 'auth/quota-exceeded') {
      return 'Sistema temporariamente indisponível. Tente novamente mais tarde.';
    }
    if (error.code === 'auth/user-disabled') {
      return 'Usuário inativo. Entre em contato com o suporte.';
    }
  }
  return error.message;
};
