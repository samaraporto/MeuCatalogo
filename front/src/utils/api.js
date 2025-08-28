const api = async (url, method = 'GET', body = null) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['x-auth-token'] = token;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`http://localhost:5001/api${url}`, options);

  //se a resposta for bem-sucedida, mas não tiver conteúdo
  if (response.ok && response.status === 204) {
    return {}; //retorna um objeto vazio para não quebrar o código que espera uma resposta
  }

  //tenta ler a resposta como texto primeiro, para ver se há conteúdo
  const text = await response.text();
  
  //se houver texto, tenta converter para json
  // Se a conversão falhar porque era texto simples, usa o texto como mensagem de erro
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    data = { msg: text }; //trata a resposta de texto como um objeto de erro
  }

  //se a resposta ñ for 'ok'
  if (!response.ok) {
    //lança um erro com a mensagem do backend (data.msg)
    throw new Error(data.msg || 'Ocorreu um erro no pedido.');
  }

  //se a resposta for 'ok' e tiver conteudo, retorna os dados
  return data;
};

export default api;
