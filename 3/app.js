class RatingComponent extends HTMLElement {

  constructor() {
    super();

  }

  connectedCallback() {
    const outerDiv = document.createElement("div");
    outerDiv.addEventListener("mouseleave", (e) => {
      e.stopPropagation();
      this.removeClass(outerDiv, 'hover');
    });

    //
    for (let iter = 1; iter <= 5; iter++) {
      const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svgElement.setAttribute("width", "24");
      svgElement.setAttribute("height", "24");
      svgElement.setAttribute("viewBox", "0 0 24 24");
      svgElement.setAttribute("fill-rule", "evenodd");
      svgElement.setAttribute("clip-rule", "evenodd");
      svgElement.setAttribute("stroke", "black");
      svgElement.addEventListener("mouseover", (e) => {
        e.stopPropagation();
        this.addHoverClass(svgElement);
      });
      svgElement.addEventListener("click", (e) => {
        e.stopPropagation();
        this.onclick(svgElement);
      });
      //
      const pathElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
      pathElement.classList.add("icon");
      pathElement.setAttribute("d", "M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z");
      svgElement.appendChild(pathElement);

      outerDiv.appendChild(svgElement);
    }

    this.append(outerDiv);
    //
    if (this.getAttribute('value')) {
      this.rated = true;
      for (let iter = 0; iter < this.getAttribute('value'); iter++) {
        outerDiv.children[iter].firstElementChild.classList.add('active');
      }
    }

  }

  removeClass(element, className) {
    let widgetElement = element.firstElementChild;
    while (widgetElement != null) {
      widgetElement.firstElementChild.classList.remove(className);
      widgetElement = widgetElement.nextElementSibling;
    }
  }

  onclick(element) {
    let rating = 0;
    this.rated = true;
    this.removeClass(element.parentElement, 'active');
    while (element != null) {
      element.firstElementChild.classList.add('active');
      element = element.previousElementSibling;
      rating += 1;
    }
    //
    eval(this.getAttribute("onclick"))(rating, this.getAttribute('name'));
  }

  addHoverClass(element) {
    if (!this.rated) {
      this.removeClass(element.parentElement, 'hover');

      while (element != null) {
        element.firstElementChild.classList.add('hover');
        element = element.previousElementSibling;
      }
    }
  }

}

customElements.define('star-rating', RatingComponent);

function submitRating(rating, product_info) {
  console.log(`ajax request with ${rating}, product-info ${product_info}`);
}