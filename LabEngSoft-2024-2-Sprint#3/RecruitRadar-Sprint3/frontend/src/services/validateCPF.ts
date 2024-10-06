export function validateCPF(cpf:string)  {
    const cleanedCPF = cpf.replace(/\s/g, '');
    const cpfRegex = /^[0-9]{9}-[0-9]{2}$/;
  
    if (cleanedCPF.length !== 12) { // 9 dígitos + 1 hífen + 2 dígitos
      return 'CPF deve conter 11 dígitos e um hífen no formato 999999999-99.';
    } else if (!cpfRegex.test(cleanedCPF)) {
      return 'CPF inválido. Use o formato 999999999-99.';
    }
  
    return ''; // Sem erros
  };