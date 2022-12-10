export const getData = async () => {
  return fetch('https://studika.ru/api/areas', {
    method: 'POST',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('DATA', data);
      return data;
    });
};
