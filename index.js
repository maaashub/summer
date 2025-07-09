 let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const tocList = document.getElementById('toc-list');
        const toc = document.getElementById('toc');

        // Function to populate TOC and add IDs if missing
        function populateToc() {
            slides.forEach((slide, index) => {
                const dayHeader = slide.querySelector('.day-header');
                if (dayHeader) {
                    const dayText = dayHeader.textContent;
                    const slideId = `slide-${index + 1}`;
                    slide.id = slideId; // Ensure slide has an ID
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = `#${slideId}`;
                    link.textContent = dayText;
                    link.onclick = (e) => {
                        e.preventDefault();
                        currentSlide = index;
                        showSlide(currentSlide);
                        toggleToc(); // Close TOC after selecting
                    };
                    listItem.appendChild(link);
                    tocList.appendChild(listItem);
                }
            });
        }

        function showSlide(n) {
            slides.forEach((slide, index) => {
                if (index === n) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });
            updateTocActiveState();
        }

        function changeSlide(direction) {
            currentSlide += direction;
            if (currentSlide < 0) {
                currentSlide = slides.length - 1;
            } else if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        }

        function updateTocActiveState() {
            const tocItems = tocList.querySelectorAll('li');
            tocItems.forEach((item, index) => {
                if (index === currentSlide) {
                    item.classList.add('active-day');
                } else {
                    item.classList.remove('active-day');
                }
            });
        }

        function toggleToc() {
            toc.classList.toggle('open');
        }

        // Initialize on page load
        window.onload = function() {
            populateToc();
            showSlide(currentSlide);
        };

        // Keyboard navigation
        document.addEventListener('keydown', function(event) {
            if (event.key === 'ArrowRight') {
                changeSlide(1);
            } else if (event.key === 'ArrowLeft') {
                changeSlide(-1);
            }
        });