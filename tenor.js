const myKey = "AIzaSyB9GJDrLt3rV_qCrq42Ryr9VXn7xME13aM";
const carouselNav = `<button
class="carousel-control-prev"
type="button"
data-mdb-target="#carouselExampleControls"
data-mdb-slide="prev"
>
<span class="carousel-control-prev-icon" aria-hidden="true"></span>
<span class="visually-hidden">Previous</span>
</button>
<button
class="carousel-control-next"
type="button"
data-mdb-target="#carouselExampleControls"
data-mdb-slide="next"
>
<span class="carousel-control-next-icon" aria-hidden="true"></span>
<span class="visually-hidden">Next</span>
</button>`;
let defaultKeywords = ["fun", "joy", "happines", "curious", "kitten"];
let keywords = "";
$(document).ready(function () {
  setbackground();
  $("#searchIcon").click(function () {
    getData();
  });
});

async function getData() {
    keywords = $("#form1").val();

  $(".carousel-inner").html("");
  let url = `https://tenor.googleapis.com/v2/search?q=${keywords}&key=${myKey}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  let html, description;
  for (let i = 0; i < data.results.length; i++) {
    description = data.results[i].content_description;
    html = `<div class="carousel-item`;
    if (i == 0) {
      html += ` active`;
    }
    html += `"><img src="${data.results[i].media_formats.gif.url}" class="d-block w-100 h-100" /> <div class="carousel-caption d-none d-md-block"> <h5>${description}</h5></div> </div>`;
    // let html = `<img src="${data.results[i].media_formats.gif.url}"/>`

    $(".carousel-inner").append(html);
  }
  $(".carousel-inner").append(carouselNav);

  $("html, body").animate({ scrollTop: $(document).height() }, "slow");
}

async function setbackground() {
  let n = Math.floor(Math.random() * defaultKeywords.length);
  let n2;
  let keyword = defaultKeywords[n];
  let url = `https://tenor.googleapis.com/v2/search?q=${keyword}&key=${myKey}`;
  const response = await fetch(url);
  const data = await response.json();
  n2 = Math.floor(Math.random() * data.results.length);
  let heroImageBg = data.results[n2].media_formats.gif.url;

  $(".hero-image").css({
    "background-image": `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImageBg})`,
  });
}
