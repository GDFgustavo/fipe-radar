export const authErrorMap: Record<string, string> = {
  "Invalid login credentials": "E-mail ou senha incorretos. Tente novamente.",
  "Email not confirmed": "Por favor, confirme seu e-mail antes de acessar.",
  "User already registered": "Este e-mail já está sendo usado.",
  "Password should be at least 6 characters": "A senha deve ter pelo menos 6 caracteres.",
  "Auth session missing": "Sessão expirada. Solicite um novo e-mail de recuperação.",
  "Too many requests": "Muitas tentativas. Aguarde um pouco e tente novamente.",
  "default": "Ocorreu um erro inesperado. Tente novamente.",
  "Invalid email": "O formato do e-mail digitado é inválido.",
  "New password should be different from the old password": "A nova senha deve ser diferente da senha atual.",
  "Identity not found": "Usuário não encontrado em nossa base de dados.",
  "Flow state not found": "O link de recuperação expirou ou já foi utilizado.",
  "Database error saving new user": "Erro ao salvar os dados. Tente novamente."
};


export function getErrorMessage(error: any): string {
  if (!error) return authErrorMap["default"];
  
  const originalMessage = error.message || error;

  if (authErrorMap[originalMessage]) {
    return authErrorMap[originalMessage];
  }

  if (originalMessage.includes("rate limit") || originalMessage.includes("Too many requests")) {
    return authErrorMap["Too many requests"];
  }

  return authErrorMap["default"];
}