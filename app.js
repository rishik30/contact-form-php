(function($) {
    $.fn.visible = function(partial) {
          var $t            = $(this),
              $w            = $(window),
              viewTop       = $w.scrollTop(),
              viewBottom    = viewTop + $w.height(),
              _top          = $t.offset().top,
              _bottom       = _top + $t.height(),
              compareTop    = partial === true ? _bottom : _top,
              compareBottom = partial === true ? _top : _bottom;

        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

     };

})(jQuery);

var window = $(window);

function getNextSiblings(el) {
    var res = [];
    el = el.parentNode.firstChild;
    while(el = el.nextSibling){
        if(el.nodeType === 3) continue;
        res.push(el);
    }
    return res;
}

function getPrevSiblings(el) {
    var res = [];
    el = el.parentNode.firstChild;
    while(el = el.prevSibling){
        if(el.nodeType === 3) continue;
        res.push(el);
    }
    return res;
}

function openTab(event, member) {
    var i, tabContent, tabLinks;
    tabContent = document.getElementsByClassName("tabContent");
    for(i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    tabLinks = document.getElementsByClassName("tabLinks");
    for(i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace("active", "");
    }
    event.currentTarget.className += " active";
    var elem = document.getElementById(member);
    elem.style.display = "flex";
    var prevSib = getPrevSiblings(elem);
    for(i = 0; i < prevSib.length; i++) {
        prevSib[i].className = prevSib[i].className.replace("active", "");
    }
    var nextSib = getNextSiblings(elem);
    for(i = 0; i < nextSib.length; i++) {
        nextSib[i].className = nextSib[i].className.replace("active", "");
    }
    elem.className += " active";
}

// SCROLLING ANIMATION
$(window).scroll(function(event) {

    var menuBar = document.getElementById("bm-menu");
    if(scrollY > 160) {
        menuBar.classList.add('cover');
        menuBar.children[0].src = "resources/img/general/bm-logo-bgcolor.jpg";
    }
    else {
        menuBar.className = "bm-menu";
        menuBar.children[0].src = "resources/img/general/BM.png";
    }
    //ABOUT-US
    var el = $(".about-us-card");
    if(el.visible(true)) {
        el.addClass("slide-right");
    }

    //SERVICES
    var service = $(".service");
    if(service.visible(true)) {
        service.addClass("active");
    }

    //GALLERY
    var portfolio = $(".portfolio");
    if(portfolio.visible(true)) {
        portfolio.addClass("active");
    }

    //TEAM
    var teamText = $(".team-text-container");
    if(teamText.visible(true)) {
        teamText.addClass("slide-right");
    }
    var teamBM = $(".team-bm-container");
    if(teamBM.visible(true)) {
        teamBM.addClass("slide-left");
    }

    //CONTACT
    var contact = $(".flex-container");
    if(contact.visible(true)) {
        contact.addClass("active");
    }
});

var activateGallery = function(e, brand) {
    var galleryName = brand + '-gallery';
    var galleryFile = 'components/'+galleryName+'.html';
    console.log(galleryFile);
    $("#mymodal-content").load(galleryFile);
    activateModal();
}

var activateModal = function() {
    var modal = document.getElementById("modal");
    modal.classList.add('active');
    document.getElementsByTagName("body")[0].classList.add("no-scroll");
}

var closeModal = function() {
    var modal = document.getElementById("modal");
    document.getElementsByTagName("body")[0].classList.remove("no-scroll");
    modal.classList.remove('active');
}

$(document).ready(function() {

    console.log("READY..");

    // SMOOTH-SCROLL
    smoothScroll.init({
        selector: '[data-scroll]',
        speed: 1000,
        easing: 'easeInOutQuint',
        offset: 0
    });

    // TESIMONIAL CARAOUSEL
    $('.carousel').carousel({
        interval: 5000,
        wrap: true
    });
    $('.view-next').carousel('next');
    $('.view-prev').carousel('prev');

    //CONTACT-FORM
    $("#submit").click(function() {
        var name = $("#name").val();
        var email = $("#email").val();
        var query = $("#query").val();
        console.log('clicked');
        if(name == "" || email == "" || query == "") {
            console.log('empty');
        }
        else {
            $.post("../php/contact-form-submit.php", {
                name1: name,
                email1: email,
                query1: query
            }, function(data) {
                console.log('DATA', data);
                $("#form")[0].reset();
            });
        }
    });

});

$(window).on('load', function() {
    console.log('window loaded');
    var defaultEl = document.getElementById("defaultOpen");
    if(defaultEl) {
        console.log(defaultEl.childNodes[1]);
        var tab = defaultEl.childNodes[1];
        tab.click();
    }
});
