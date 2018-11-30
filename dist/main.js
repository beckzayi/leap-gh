(function(){
    // Screen Size in px
    var screen_sm = 768;

    // Window resize function
    var onresize = function(e) {
        if (e.target.innerWidth < screen_sm) {
            displayHighlightsOnMobile();
            toggleMenu();
            toggleSettingButtons();
        } else {
            displayHighlightsOnDesktop();
        }
    }
    window.addEventListener('resize', onresize);

    // Load mobile version
    var innerWidth = window.innerWidth;
    var innerHeight = window.innerHeight;
    if (innerWidth < screen_sm) {
        displayHighlightsOnMobile();
        toggleMenu();
        toggleSettingButtons();
    }

    function displayHighlightsOnMobile() {
        var slideIndex = 1;

        var showSlides = function(n) {
            var i;
            var slides = document.getElementsByClassName("highlight-item");
            var dots = document.getElementsByClassName("dot");
            if (n > slides.length) {
                slideIndex = 1;
            } 
            if (n < 1) {
                slideIndex = slides.length
            }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none"; 
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[slideIndex-1].style.display = "block"; 
            dots[slideIndex-1].className += " active";
        }
        showSlides(slideIndex);

        var currentSlide = function(n) {
            showSlides(slideIndex = n);
        }

        var onClickDots = function() {
            var dots = document.querySelectorAll(".dot");
            dots.forEach(function(dot, index){
                dot.addEventListener('click', function(){
                    currentSlide(index + 1);
                });
            });
        };
        onClickDots();
    }

    function displayHighlightsOnDesktop() {
        var slides = document.getElementsByClassName("highlight-item");
        for (var i = 0; i < slides.length; i++) {
            slides[i].style.display = "block"; 
        }
    }

    // Toggle the menu on mobile
    function toggleMenu() {
        var toggle = document.getElementById('toggle-menu');
        var sidebar = document.querySelector('.sidebar');
        var body = document.querySelector('body');
        var ff_overlay = document.querySelector('.ff-overlay');
        sidebar.style.height = innerHeight + 'px';

        toggle.addEventListener('click', function(){
            if (body.classList.contains('show_menu')) {
                sidebar.classList.remove('s_visible');
                body.classList.remove('show_menu');
                ff_overlay.classList.remove('ff_visible');
            } else {
                sidebar.classList.add('s_visible');
                body.classList.add('show_menu');
                ff_overlay.classList.add('ff_visible');
                ff_overlay.addEventListener('click', function(){
                    sidebar.classList.remove('s_visible');
                    body.classList.remove('show_menu');
                    ff_overlay.classList.remove('ff_visible');
                    document.removeEventListener('touchmove', handleTouchMove);
                });
                document.addEventListener('touchmove', handleTouchMove, { passive: false });
            }
        });
    }

    // Prevent page scroll on drag
    function handleTouchMove(e) {
        e.preventDefault();
    }

    function toggleSettingButtons() {
        var toggle_setting = document.getElementById('toggle-setting');
        var button_bar = document.querySelector('.button-bar');
        var body = document.querySelector('body');
        toggle_setting.addEventListener('click', function(e){
            e.stopPropagation();
            if (button_bar.classList.contains('expand')) {
                button_bar.classList.remove('expand');
            } else {
                button_bar.classList.add('expand');
            }
        });

        body.addEventListener('click', function(){
            if (button_bar.classList.contains('expand')) {
                button_bar.classList.remove('expand');
            }
        });
    }
    
})();