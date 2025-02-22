export const exerciseOptions =  {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c5ca3c2b23mshfdfbf3d153af54ep10e1b6jsna5cd198a4114',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };

  export const youtubeOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c5ca3c2b23mshfdfbf3d153af54ep10e1b6jsna5cd198a4114',
      'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
    }
  };

export const fetchData = async(url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
}