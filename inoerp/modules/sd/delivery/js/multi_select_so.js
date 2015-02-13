$(document).ready(function () {
 $('#content').on('click', '.line_status', function () {
  alert('You can only search lines which are not picked');
  $(this).attr('readonly', true);
 });

 $('body').off('click', '.line_id_cb').on('click', '.line_id_cb', function () {
  var this_e = $(this);
  var Onhand = +$(this).closest('tr').find('.onhand').val();
  var lineQuantity = +$(this).closest('tr').find('.line_quantity').val();
  var pickedQuantity = +$(this).closest('tr').find('.picked_quantity').val();
  var kitItem = false;
  var trClass = '.' + $(this).closest('tr').attr('class').replace(/\+s/g, '.');
  if ($('#form_line').find(trClass).find('.kit_cb').val()) {
   var kitItem = true;
  }

  if ((Onhand < lineQuantity) && (!kitItem)) {
   alert('Available Onhand is less than line quantity');
  }

  if (pickedQuantity >= lineQuantity) {
   $('#form_line').find(trClass).find('.line_id_cb').prop('disabled', true);
   alert('All line quantities are in picked status!');
  }

 });

 $('.line_id_cb').each(function () {
  var Onhand = +$(this).closest('tr').find('.onhand').val();
  var lineQuantity = +$(this).closest('tr').find('.line_quantity').val();
  var pickedQuantity = +$(this).closest('tr').find('.picked_quantity').val();
  var kitItem = false;
  var trClass = '.' + $(this).closest('tr').attr('class').replace(/\+s/g, '.');
  if ($('#form_line').find(trClass).find('.kit_cb').val()) {
   var kitItem = true;
  }

  if (Onhand < lineQuantity && !kitItem) {
   $(this).closest('tr').find('input').each(function () {
    $(this).css('background', 'rgba(255,40,0,0.5)');
   });
   $(this).closest('tr').find('.line_id_cb').prop('disabled', true);
  } else {
   $(this).closest('tr').find('input').each(function () {
    $(this).css('background', 'rgba(204,255,153,0.8)');
   });
  }

  if (pickedQuantity >= lineQuantity) {
   $('#form_line').find(trClass).find('.line_id_cb').prop('disabled', true);
  }

 });

 //context menu
 var classContextMenu = new contextMenuMain();
 classContextMenu.trClass = 'multi_select_value_line';
 classContextMenu.tbodyClass = 'form_data_line_tbody';
 classContextMenu.noOfTabbs = 5;
 classContextMenu.contextMenu();
 
 

$('body').off('click','.pick_list.button').on('click','.pick_list.button', function(){
var lineIds = $('#form_line').find('input.line_id_cb[type="checkbox"]:checked').serializeArray();
save_dataInSession({
  data_name : 'pick_list',
  data_value : lineIds,

});

})

});
