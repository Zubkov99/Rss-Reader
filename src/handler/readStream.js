/* eslint-disable no-param-reassign */
import axios from 'axios';
import parseXml from './parseXml.js';
import updateState from './updateState.js';
import { mapping, errorHandler } from './errorHandler.js';

const readStream = (query, state) => {
  const proxy = 'https://allorigins.hexlet.app';
  const params = { disableCache: true, url: query };
  const proxyUrl = new URL('/get', proxy);
  const searchParams = new URLSearchParams(params);
  proxyUrl.search = searchParams.toString();

  axios.get(proxyUrl)
    .then((response) => {
      console.log('New request received');
      return parseXml(response);
    })
    .then((data) => {
      updateState(state, data, query);
    })
    .catch((error) => {
      if (error instanceof mapping.parsingError) {
        state.inputType = 'rssMissing';
        throw error;
      }
      if (error.isAxiosError) {
        state.inputType = 'networkError';
        throw error;
      }
      errorHandler();
    });
};

export default readStream;
