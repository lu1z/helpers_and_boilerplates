const lazyDOMReference = {};

function deleteDOMReference(node) {
  if (node.id !== '') delete lazyDOMReference[node.id];
  else delete lazyDOMReference[node.className];
}

function addDOMReference(node) {
  if (!(node instanceof Element)) return;
  if (node.id !== '') lazyDOMReference[node.id] = node;
  else if (node.className !== '') lazyDOMReference[node.className] = node;
}

function scoultHTML() {
  document
    .querySelectorAll('[class], [id]')
    .forEach((element) => addDOMReference(element));
}

function observeNodeIndel(observedNode) {
  new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => addDOMReference(node));
      mutation.removedNodes.forEach((node) => deleteDOMReference(node));
    });
  }).observe(observedNode, { subtree: true, childList: true });
}

function init() {
  scoultHTML();
  observeNodeIndel(document.querySelector('body'));
  return lazyDOMReference;
}

export const LDR = init();