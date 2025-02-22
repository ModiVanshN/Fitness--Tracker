export const exerciseOptions =  {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '00e239edf7msh0a31544cb552c2cp1a75a3jsn4963659286be',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };

  export const youtubeOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '00e239edf7msh0a31544cb552c2cp1a75a3jsn4963659286be',
      'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
    }
  };

export const fetchData = async(url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
}