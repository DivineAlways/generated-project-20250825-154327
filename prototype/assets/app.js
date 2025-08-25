document.addEventListener('DOMContentLoaded', () => {
    const modulesContainer = document.getElementById('modules-container');
    const testimonialsContainer = document.getElementById('testimonials-container');

    const fetchData = async () => {
        try {
            const response = await fetch('assets/dummy-data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Could not fetch data:", error);
            return null;
        }
    };

    const renderModules = (modules) => {
        if (!modules || !modulesContainer) return;
        modulesContainer.innerHTML = modules.map((module, index) => `
            <div class="accordion-item">
                <div class="accordion-header">
                    <span>${module.title}</span>
                </div>
                <div class="accordion-content">
                    <div class="accordion-content-inner">
                        <p>${module.description}</p>
                        <ul>
                            ${module.lessons.map(lesson => `<li>${lesson}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `).join('');
        addAccordionListeners();
    };

    const renderTestimonials = (testimonials) => {
        if (!testimonials || !testimonialsContainer) return;
        testimonialsContainer.innerHTML = testimonials.map(testimonial => `
            <div class="testimonial-card">
                <p class="quote">"${testimonial.quote}"</p>
                <p class="author">${testimonial.name} - ${testimonial.handle}</p>
            </div>
        `).join('');
    };

    const addAccordionListeners = () => {
        const accordionItems = document.querySelectorAll('.accordion-item');
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            const contentInner = item.querySelector('.accordion-content-inner');

            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                accordionItems.forEach(i => {
                    i.classList.remove('active');
                    i.querySelector('.accordion-content').style.maxHeight = '0';
                    i.querySelector('.accordion-content').style.padding = '0 20px';
                });

                // Open the clicked one if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                    content.style.maxHeight = contentInner.scrollHeight + "px";
                    content.style.padding = '20px';
                }
            });
        });
    };

    const init = async () => {
        const data = await fetchData();
        if (data) {
            renderModules(data.modules);
            renderTestimonials(data.testimonials);
        }
    };

    init();
});