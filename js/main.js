var headphone = document.getElementById('headphone');
headphone.addEventListener('load', () => {
    // svg components
    var svgDoc = headphone.contentDocument;
    var outlineHeadphone1 = svgDoc.getElementById('outline-headphone1');
    var outlineHeadphone2 = svgDoc.getElementById('outline-headphone2');
    var iconContainer = svgDoc.getElementById('inside-background-rectangle');
    var iconShape = svgDoc.getElementById('icon');
    var heartDetail = svgDoc.getElementById('detail-heart');

    // magic begins
    // 2 hours
    var removeBtn = document.getElementById('removeBtn');
    var startBtn = document.getElementById('startBtn');

    var colorSetTimeOut = (polygonEls, polygonLength, i, oldClass, newClass, mode = "add") => {
        setTimeout(() => {
            polygonEls[i].classList.remove(oldClass);
            mode == 'add' ? polygonEls[i].classList.remove('st420') : polygonEls[i].classList.add('st420');
            polygonEls[i].classList.add(newClass);
            
            polygonEls[polygonLength + i].classList.remove(oldClass);
            polygonEls[polygonLength + i].classList.add(newClass);
            mode == 'add' ? polygonEls[polygonLength + i].classList.remove('st420') : polygonEls[polygonLength + i].classList.add('st420');
        }, 8 * i);
    };

    var disableTemporary = (el, time) => {
        el.disabled = true;
        setTimeout(() => {
            el.disabled = false;
        }, time)
    };

    var colorFill = (mode = 'add') => {
        var polygonEls = svgDoc.getElementById('gHeadPhone').children;
        var polygonLength = polygonEls.length;
        var oldClass = "";
        var newClass = "";

        for(var i = 0; i < polygonLength/2; i++) {
            if(mode == 'add') {
                oldClass = polygonEls[i].classList[0] != 'st420' ? polygonEls[i].classList[0] : polygonEls[i].classList[1];
                newClass = oldClass.replace('r', '');
                colorSetTimeOut(polygonEls, polygonLength/2, i, oldClass, newClass);
            } else {
                oldClass = polygonEls[i].classList[0];
                newClass = oldClass + 'r';
                colorSetTimeOut(polygonEls, polygonLength/2, i, oldClass, newClass, 'remove');
            }
        }
    };

    document.getElementById('startBtn').addEventListener('click', () => {
        disableTemporary(removeBtn, svgDoc.getElementById('gHeadPhone').children.length / 2 * 9);
        colorFill();
    });

    document.getElementById('removeBtn').addEventListener('click', () => {
        disableTemporary(startBtn, svgDoc.getElementById('gHeadPhone').children.length / 2 * 9);
        colorFill('remove')
    });

    // animate selector
    var animateToHeart = svgDoc.getElementById('animation-to-heart');
    var animateToPlay = svgDoc.getElementById('animation-to-play');

    // audio
    var audio = new Audio('audio/Cold_Heart_Hoaprox_cut.mp3');
    if (typeof audio.loop == 'boolean') { audio.loop = true; }

    // remove and pause
    var rmAndPause = () => {
        iconShape.classList.remove('heart-beat');
        heartDetail.classList.remove('fade-in');
        audio.pause();
        // remove shaking outline
        outlineHeadphone1.classList.remove('shake-outline');
        outlineHeadphone2.classList.remove('shake-outline2');
    };

    var addAndPlay = () => {
        iconShape.classList.add('heart-beat');
        heartDetail.classList.add('fade-in');
        audio.play();
        // shaking outline
        outlineHeadphone1.classList.add('shake-outline');
        outlineHeadphone2.classList.add('shake-outline2');     
    };

    // -------------------------
    // Icon click event
    // -------------------------
    iconContainer.addEventListener('click', () => {
        // change color inside background
        iconContainer.classList.toggle('change-color-inside-background');
        iconContainer.classList.toggle('fill-gradient');

        // -------------------------
        // animate to heart <-> play
        // -------------------------
        if(iconShape.classList.contains('toPlay')) {
            audio.currentTime = 0;
            if(iconShape.classList.contains('heart-beat')) {
                rmAndPause();
            }
            iconShape.classList.remove('toPlay');
            animateToPlay.beginElement();
        }
        else {
            iconShape.classList.add('toPlay');
            if(!iconShape.classList.contains('heart-beat')) {
                addAndPlay();
            }
            animateToHeart.beginElement();
        }
        
    }, false);   

    // -------------------------
    // Doc hover event
    // -------------------------
    svgDoc.addEventListener('mouseover', (e) => {
        if(iconShape.classList.contains('toPlay')) {
            if(!iconShape.classList.contains('heart-beat')) {
                addAndPlay();
            }
            audio.play();
        }
        else {
            audio.pause();
        }
    }, false)

    svgDoc.addEventListener('mouseout', (e) => {
        if(iconShape.classList.contains('heart-beat')) {
            rmAndPause();            
        }
    }, false);

    // -------------------------
    // Loop & replay
    // -------------------------
    audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        audio.play();
    }, false);

}, false);
