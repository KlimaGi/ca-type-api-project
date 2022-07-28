function renderPaginationLinks(parentSelector, page, limit, segment, total) {
  let pathName = document.location.pathname;
  console.log("pathName", pathName);
  //pages
  let totalCount = Number(total);
  let currentPage = Number(page);
  let pages = Math.ceil(total / limit);

  //segments
  let pagesInSegment = 5;
  let segmentsCount = Math.ceil(pages / pagesInSegment);
  let currentSegment = Number(segment);
  let firstPageInSegment = (currentSegment - 1) * pagesInSegment + 1;
  let lastPageInSegment;
  if (currentSegment < segmentsCount) {
    lastPageInSegment = pagesInSegment * currentSegment;
  } else {
    lastPageInSegment = pages;
  }

  if (totalCount <= limit) return;

  let postsWrapperEl = document.querySelector(parentSelector);
  let paginationWrapperEl = document.createElement("div");
  paginationWrapperEl.classList.add("pagination-wrapper");

  if (currentPage !== 1) {
    let firstPaginationPageItem = document.createElement("a");
    firstPaginationPageItem.href = `.${pathName}?page=1&limit=${limit}&segment=1`;
    firstPaginationPageItem.textContent = "First";
    firstPaginationPageItem.classList.add("pagination-arrow");

    let prevPaginationEl = document.createElement("a");
    let prevPage = currentPage - 1;
    let segmentByBackArrow = Math.ceil(prevPage / pagesInSegment);
    prevPaginationEl.href = `.${pathName}?page=${prevPage}&limit=${limit}&segment=${segmentByBackArrow}`;
    prevPaginationEl.textContent = "<";
    prevPaginationEl.classList.add("pagination-arrow");

    let prevSegmentEl = document.createElement("a");
    if (currentSegment !== 1) {
      prevSegmentEl.href = `.${pathName}?page=${pagesInSegment}&limit=${limit}&segment=${
        currentSegment - 1
      }`;
      prevSegmentEl.textContent = "<<";
      prevSegmentEl.classList.add("pagination-arrow");
    }

    paginationWrapperEl.append(
      firstPaginationPageItem,
      prevSegmentEl,
      prevPaginationEl
    );
  }

  for (let i = firstPageInSegment; i <= lastPageInSegment; i++) {
    let paginationItem;

    if (i === currentPage) {
      paginationItem = document.createElement("span");
      paginationItem.classList.add("current-page");
    } else {
      paginationItem = document.createElement("a");
      let currentSegmentByI = Math.ceil(i / pagesInSegment);
      paginationItem.href = `.${pathName}?page=${i}&limit=${limit}&segment=${currentSegmentByI}`;
    }

    paginationItem.textContent = i;
    paginationItem.classList.add("pagination-item");
    paginationWrapperEl.append(paginationItem);
  }

  if (currentPage !== pages) {
    let lastPaginationPageItem = document.createElement("a");
    lastPaginationPageItem.href = `.${pathName}?page=${pages}&limit=${limit}&segment=${segmentsCount}`;
    lastPaginationPageItem.textContent = "Last";
    lastPaginationPageItem.classList.add("pagination-arrow");

    let nextPaginationEl = document.createElement("a");
    let segmentFromPage = Math.ceil((currentPage + 1) / pagesInSegment);
    nextPaginationEl.href = `.${pathName}?page=${
      currentPage + 1
    }&limit=${limit}&segment=${segmentFromPage}`;
    nextPaginationEl.textContent = ">";
    nextPaginationEl.classList.add("pagination-arrow");

    let nextSegmentEl = document.createElement("a");
    if (currentSegment !== segmentsCount) {
      nextSegmentEl.href = `.${pathName}?page=${
        firstPageInSegment + pagesInSegment
      }&limit=${limit}&segment=${currentSegment + 1}`;
      nextSegmentEl.textContent = ">>";
      nextSegmentEl.classList.add("pagination-arrow");
    }

    paginationWrapperEl.append(
      nextPaginationEl,
      nextSegmentEl,
      lastPaginationPageItem
    );
  }

  postsWrapperEl.append(paginationWrapperEl);
}
export { renderPaginationLinks };
