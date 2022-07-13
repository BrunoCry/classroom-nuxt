export const downloadFromBlob = async (blob, name = 'file.txt') => {
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = name;
    document.body.appendChild(link);

    link.dispatchEvent(
      new MouseEvent('click', { 
        bubbles: true, 
        cancelable: true, 
        view: window 
      })
    );

    document.body.removeChild(link);
}

export const searchByField = (target, searchField, value) => {
  return target.filter(
    e => e[searchField].toLowerCase().includes(value.toLowerCase())
  )
}