$(document).ready(function(){

  var paginatorContainer = document.getElementsByClassName('b-content__paginator')[0];

  $.ajax('/test/blogs.json', {
    type: 'GET',
    dataType: 'json',
    success: function(res) {
      for(i = 4; i < res.length; i++) {
        renderBlogItem(res[i]);
      }
      clampText();
      paginatorContainer.firstElementChild.className = "current-page";
    },
    error: function(req,status,err) {
      console.log("Error " + req,status,err);
    }
  });

  function renderBlogItem(el){

    var container = document.getElementsByClassName('b-content__container')[0];

    var a = document.createElement("a");
    a.className = "blog-item__inner col sm-4 xs-6";
    a.setAttribute("href", el.linkBlogPage);

    var div = document.createElement("div");
    div.className = "blog-item__bg";
    a.appendChild(div);

    var img = document.createElement("img");
    img.setAttribute("src", el.linkTitleImg);
    div.appendChild(img);

    var pBold = document.createElement("p");
    pBold.className = "text bold";
    pBold.innerHTML = el.dateBlogPublication;
    a.appendChild(pBold);

    var h2 = document.createElement("h2");
    h2.innerHTML = el.titleBlog;
    a.appendChild(h2);

    var pText = document.createElement("p");
    pText.className = "text";
    pText.setAttribute("data-clamp", "");
    pText.innerHTML = "<span>" + el.descriptionBlog + "</span>";
    a.appendChild(pText);

    container.appendChild(a);
  }

  function clampText() {
    $(".blog-item__inner p.text[data-clamp]").each(function(index, el){
      $clamp(el, {clamp: 6});
    });
  }

  var spanPaginator = paginatorContainer.getElementsByTagName('span');

  paginatorContainer.addEventListener('click', goToPage);

function goToPage(e) {
  var target = e.target;
  if(target.tagName != 'SPAN') return;
  var numberPage = target.innerHTML;

    $.ajax({
      url: '/blogs.php',
      type: 'POST',
      contentType: false,
      processData: false,
      data: numberPage,
      success: function(data) {
        console.log('success!', data);
      },
      error: function(e) {
        console.log('error: ', e);
    }
  });

}

});