$(document).ready(function(){
	$('.nav li').click(function(e) {
			console.log("clicked" );
			$('.nav li.active').removeClass('active');
			var $this = $(this);
			if (!$this.hasClass('active')) {
							$this.addClass('active');
			}
	});
})
	
