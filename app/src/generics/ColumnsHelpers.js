export const showOnDatatable = (row) => row.datatable || row.datatableRender ? true : false;

export const firstAvaliable = (description, properties) => {
  let i = 0 ;
  while(!description[properties[i]] && i < properties.length) i++;
  return description[properties[i]];
};
