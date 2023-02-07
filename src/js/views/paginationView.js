import icons from 'url:../../img/icons.svg';
import View from './view.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const generatePrevPage = function () {
      return `  <button data-goto="${
        curPage - 1
      }" class="btn--inline      pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
      `;
    };
    const generateNextPage = function () {
      return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          `;
    };

    //  Page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return generateNextPage();
    }
    //  Last Page
    if (curPage === numPages && numPages > 1) {
      return generatePrevPage();
    }
    //  Other page
    if (curPage < numPages) {
      return generateNextPage() + generatePrevPage();
    }

    //  Page 1 and there are no other pages
    return '';
  }
}

export default new PaginationView();
