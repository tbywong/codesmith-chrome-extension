'use strict'

const request = new XMLHttpRequest()

// Helper function (GET): Put desired data into an object
function getDataObj (data) {
  let dataObj = {
    title: [],
    image: [],
    overview: [],
    rating: []
  }
  for (let i = 0; i < data.length; i++) {
    dataObj.title.push(data[i].title)
    dataObj.image.push('https://image.tmdb.org/t/p/w185' + data[i].poster_path)
    dataObj.overview.push(data[i].overview)
    dataObj.rating.push('User Rating: ' + Math.round(data[i].vote_average) + '/10')
  }
  return dataObj
}

// Helper function (jQuery): Compiles all divs
function compiler (data, index) {
  const $movieWrapper = $(`<div class="movie-wrapper">`)
  const $titles = $(`<div class="title">${data.title[index]}</div>`)
  const $overview = $(`<div class="overview">${data.overview[index]}</div>`)
  const $rating = $(`<div class="rating">${data.rating[index]}</div>`)
  const $images = $(`<div class="imgWrap"><img src="${data.image[index]}"><div class="hoverText"><span>Watch Trailer</span></div></div>`)

  $images.click(() => {
    const search = data.title[index].replace(/ /g, '+')
    window.open(`http://www.youtube.com/results?search_query=${search}+trailer`)
  })

  $('body').append($movieWrapper)
  $movieWrapper.append($titles)
  $movieWrapper.append($images)
  $movieWrapper.append($rating)
  $movieWrapper.append($overview)
}

// --------- GET request
request.open('GET', 'http://api.themoviedb.org/3/movie/now_playing?api_key=0fdbb8fb91fc7d7557228fd3d1fcaa52')
request.setRequestHeader('Accept', 'application/json')

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    const data = JSON.parse(this.responseText)
    const resultsArr = data.results
    const dataObj = getDataObj(resultsArr)

    // --------- jQuery
    $(document).ready(() => {
      for (let i = 0; i < dataObj.title.length; i++) {
        compiler(dataObj, i)
        console.log(dataObj.title[i])
      }
    })
  }
}

request.send()
