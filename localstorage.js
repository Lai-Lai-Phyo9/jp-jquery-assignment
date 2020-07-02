$(document).ready(function() {
	showTable();
	//Add to cart
	$('.addtoCart').click(function(){
		var id=$(this).data('id');
		var name=$(this).data('name');
		var price=$(this).data('price');
		var menu ={
			id: id,
			name: name,
			price: price,
			qty:1
		}
		//console.log(menu);

		var menuString = localStorage.getItem('menulist');
		var menuArray;

		if(menuString ==null){
			menuArray=new Array();

		}
		else
		{
			menuArray = JSON.parse(menuString);
		}
		//console.log(menuArray);

		var status = false;
		$.each(menuArray,function(i, v) {
			if (id==v.id) {
				status=true;
				v.qty++;
			}
			
		});

		if(! status){
			menuArray.push(menu);

		}
		var menuData= JSON.stringify(menuArray);
		localStorage.setItem('menulist', menuData);



	});


	//Payment
	function showTable(){
		//det gata from localstorage
		var menuSring = localStorage.getItem('menulist');
		if(menuSring){
			$('#voucher_div').show();
			var menuArray= JSON.parse(menuSring);
			var total=0;
			var tbodayData=''; var tfootData='';
			// include data in array
			if(menuArray != 0){
				//looping localstorage
				$.each(menuArray, function(i, v) {
					var name= v.name;
					var price=v.price;
					var qty=v.qty;
					var subtotal=price*qty;
					total +=subtotal;

					tbodayData +=`<tr>
									<td>
										${name}
										<span class="font-weight-lighter d-block">
										${price}</span>
									<td>
										<button class="btn btn-secondary btn-sm plusBtn" data-id="${i}">+</button>

										<span class="mx-2" >${qty}</span>

										<button class="btn btn-secondary btn-sm minusBtn" data-id="${i}">-</button>
									</td>

									<td> ${subtotal}</td>
									<td>
										<button class="btn btn-secondary btn-sm removeBtn" data-id="${i}">x</button>
									</td>
								</tr>`;

				});
				tfootData+=`<tr>
								<td colspan="4">
									<button class="btn btn-light btn-block id="checkoutBtn">
									Check Out</button>
								</td>

							</tr>`;

				$('tbody').html(tbodayData);
				$('tfoot').html(tfootData);

			}
			else {
				//array empty
				$('#voucher_div').hide();
				
			}
		}
		else{
			$('#voucher_div').hide();
		}

	}
	//Add Quantity
	$('tbody').on('click','.plusBtn', function(){
		var id=$(this).data('id');
		var menuString=localStorage.getItem("menulist");

		var menuArray=JSON.parse(menuString);
		$.each(menuArray, function(i,v){
			if(i==id){
				v.qty++;
			}
		});
		var menuData = JSON.stringify(menuArray);
		localStorage.setItem('menulist',menuData);
		showTable();
	})

	//Remove Quantity
	//Add Quantity
	$('tbody').on('click','.minusBtn', function(){
		var id=$(this).data('id');
		var menuString=localStorage.getItem("menulist");

		var menuArray=JSON.parse(menuString);
		$.each(menuArray, function(i,v){
			if(i==id){
				v.qty--;
			}
		});
		var menuData = JSON.stringify(menuArray);
		localStorage.setItem('menulist',menuData);
		showTable();
	})

	//Remove button
	$('tbody').on('click','.removeBtn', function(){
		var id=$(this).data('id');
		//console.log(id);

		var menuString= localStorage.getItem('menulist');
		var menuArray= JSON.parse(menuString);
		$.each(menuArray, function(i,v){
			if(i==id){
				menuArray.splice(id, 1);
			}

		});
		var menuData =JSON.stringify(menuArray);
		localStorage.setItem('menulist',menuData);
		showTable();
	})

	$('tfoot').on('click','#checkoutBtn', function(){
		console.log('hello');
		localStorage.clear();
		showTable();
	})

















	
});