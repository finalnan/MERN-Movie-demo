import axios from 'axios';
import HttpsProxyAgent from 'https-proxy-agent';
import dotenv from 'dotenv';

dotenv.config();

// Setting Proxy

const httpsAgent = new HttpsProxyAgent(process.env.HTTP_PROXY);

const getRequest = async (url) => {
  const response = await axios.get(url, {
    headers: {
      Accept: 'application/json',
      'Accept-Encoding': 'identity',
    },
    proxy: false,
    httpsAgent: httpsAgent,
  });
  return response.data;
};

export default { getRequest };
