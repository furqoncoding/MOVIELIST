function WrapperItemsHeader() {
  var wrpItemsHeaders = new Headers();
  wrpItemsHeaders.set('Content-Type', 'application/json');

  return wrpItemsHeaders;
}
export function GetWrapperItems(itemsLink: String) {
  var getItemsHeaders = WrapperItemsHeader();

  var getItemsInit = {
    method: 'GET',
    headers: getItemsHeaders
  };
  //console.log(getInit);
  var getItemsRequest = new Request(itemsLink, getItemsInit);
  return getItemsRequest;
}




