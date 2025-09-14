document.querySelectorAll('.resume-link a, .view-more a').forEach(anchor => {
    anchor.addEventListener('mouseover', function () {
        this.querySelector('.arrow').style.transform = 'translateX(5px)';
    });

    anchor.addEventListener('mouseout', function () {
        this.querySelector('.arrow').style.transform = 'translateX(0)';
    });
});

