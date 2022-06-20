const getProxyUrl = (query) => {
  const proxy = 'https://allorigins.hexlet.app';
  const params = { disableCache: true, url: query };
  const proxyUrl = new URL('/get', proxy);
  const searchParams = new URLSearchParams(params);
  proxyUrl.search = searchParams.toString();
  return proxyUrl;
};

export default getProxyUrl;
