function goToVitrini( vitrini ) 
{
  VitriniControllerInterface.goToVitrini(vitrini);
}

function centerMapInPoint(str_x, str_y)
{
  VitriniControllerInterface.centerMapInPoint(str_x, str_y);
}

var QUERY_FOR_MAP = "#map";
var PREFIX_LOCATION = "#location_";
var QUERY_FOR_ALL_LOCATIONS = ".location";
var CLASS_FOR_LOCATION = "location";
var CLASS_FOR_FOCUS = "focus";


var segmentsToConsider = [ 'acessorios', 'artes_plasticas', 'artesanato_contemporaneo'
	, 'complementos_para_casa', 'textil' ,'importados', 'infantil'
	, 'joalheria_autoral', 'livros', 'mobiliario', 'objetos', 'papelaria', 'popart'];

var segmentsLabels = ['acessórios', 'artes plásticas', 'artesanato contemporâneo'
	,'complementos para casa', 'têxtil', 'importados'
	,'infantil', 'joalheria autoral', 'livros', 'mobiliário', 'objetos', 'papelaria'
	,'pop art'];

var segmentColors = ['#8B8686', '#043C51', '#AA520A', '#DC6D37', '#DB9A00', '#27ACCD', 
	'#F51378', '#0E777F', '#8B00D6', '#6493F2', '#01C93E','#CB2929', '#6B328F']	
	
function focusVitriniLocation ($location, vitriniName)
{
  $('.vitriniContainer').hide();

  var centerX = parseFloat($location.css('left').replace('px', ''));
  var centerY = parseFloat($location.css('top').replace('px', ''));
  if ( $location.text().length > 3 )
  {
    centerX = centerX + 20;
  }

  // if vitriniName is equal NULL, all vitrinis in the given location will be displayed. 
  // Otherwise, vitriniName is not NULL, just the vitrini with the given name will be displayed.
  var vitrini_count = $location.attr("vitrini_size");
  for(var index = 0; index < vitrini_count; ++index)
  {
    var name = $location.attr("originalName_" + index);
    if(vitriniName && vitriniName != name)
    {
      continue;
    }

    var vitrini_id = $location.attr("vitrini_id_" + index);
    var segmentLabel = $location.attr("segment_" + index);

    var segmentRandIndex = 0;
    for (var i = 0; i < segmentsLabels.length; i++)
    {
      if (segmentLabel == segmentsLabels[i])
      {
        segmentRandIndex = i;
        break;
      }
    }
    
    var segmentNameToConsider = segmentsToConsider[segmentRandIndex];
	  var segmentColor = segmentColors[segmentRandIndex];

    var $vitriniCtner = $("#vitriniContainer_" + index);
    if(vitrini_count == 1 || vitriniName)
    {
      $vitriniCtner.hide();
      $vitriniCtner.find('.vitriniBase').show();
	  
	  var $vitriniBox = $('.vitriniBox');
		$vitriniBox.css('background', 'url(tip_bg_ballon.png)');

	  	$vitriniCtner.css('top', centerY);
	   	$vitriniCtner.css('left', centerX);
    }
    else
    {
      $vitriniCtner.find('.vitriniBase').hide();

      // TODO: it must be a constant
      var radiusX = 350;
      var radiusY = 300;
      var distributionPattern = [6, 7, 5, 0, 4, 1, 3, 2, 8];

      var maxVitrinis = 9;
      var angleStep = (2 * Math.PI / (maxVitrinis - 1));
      
      var multTipHeight = 437;
      // Enorme gambiarra........ Isso deve ser reescrito!
      if(vitrini_count % 2 == 0)
      {
        radiusX = 450;
        radiusY = 200;

        distributionPattern = [7, 8, 4, 3, 0, 2, 1, 5];
          
        maxVitrinis = 11;
        angleStep = (2 * Math.PI / (maxVitrinis - 1));
      }

      var vLocalID = index % (maxVitrinis); // prevent vitriniSize greater than 6 
      
      var x = centerX + (radiusX * Math.cos(distributionPattern[vLocalID] * angleStep));
      var y = centerY + (radiusY * Math.sin(distributionPattern[vLocalID] * angleStep)) + (multTipHeight / 2.0);
    
      $vitriniCtner.hide();
	  	$vitriniCtner.css('top', y);
	   	$vitriniCtner.css('left', x);
		
		var $vitriniBox = $('.vitriniBox');
		$vitriniBox.css('background', 'url(multi_tip_bg.png)');
    }

	  var $vitriniName = $vitriniCtner.find('.vitriniName');
	  $vitriniName.text(name);

	  //setting the image Name
	  var $vitriniSegmentIcon = $vitriniCtner.find('.vitriniSegmentIcon');
	  $vitriniSegmentIcon.attr('src', 'segments/' + segmentNameToConsider + '.png' );
	
    var $vitriniSegmentLabel = $vitriniCtner.find('.vitriniSegmentLbl');
		$vitriniSegmentLabel.text( segmentLabel );
		$vitriniSegmentLabel.css('color', segmentColor);
	  
    $vitriniCtner.show();
		
    var vitriniNameToConsider = $location.attr('originalName_' + index);
		var $vitriniBox = $vitriniCtner.find('.vitriniBox');
		$vitriniBox.attr('vitrini_name', vitriniNameToConsider );
		$vitriniBox.unbind ('click');
		$vitriniBox.bind ('click', 
			function ( event )
			{ 
				var vname = $(this).attr('vitrini_name');
				goToVitrini( vname );
				event.stopPropagation();
			}
		);
	}
  
	centerMapInPoint(centerX, centerY); 
}
	
function showVitrini( vitriniId, vitriniName, locationId, segment ) 
{
	
	var $map = $( QUERY_FOR_MAP );   
	
	var locationQuery = PREFIX_LOCATION + locationId;
	
	var $locationIcon = $map.find( locationQuery );
	
	if ( $locationIcon.length == 0 )
	{
		return;
	}
	
	var vitrinis_length =  $locationIcon.attr('vitrini_size');
	
	if ( vitrinis_length == undefined )
	{
		vitrinis_length = 0;
	}
	
	
	$locationIcon.attr('vitrini_id_' + vitrinis_length, vitriniId );
	
	//adicionando o segmento
	$locationIcon.attr('segment_' + vitrinis_length, segment );
	
	$locationIcon.attr('originalName_' + vitrinis_length, vitriniName );
	
	//adicionando o nome
	var vitriniNameToStore = vitriniName.trim();
	vitriniNameToStore = vitriniNameToStore.toLowerCase();
	
	$locationIcon.attr('name_' + vitrinis_length, vitriniNameToStore );
	

	$locationIcon.unbind('click');
	$locationIcon.click( 
		function( eventLocationIcon )
		{
			var $location = $(this);
			
			focusVitriniLocation( $location ); 
			eventLocationIcon.stopPropagation();
		}
	);
	
	vitrinis_length++;
	$locationIcon.attr('vitrini_size', vitrinis_length);
	
	
}

function applySegmentFilter( segment )
{
	var $map = $( QUERY_FOR_MAP );   
	
	var locationQuery = QUERY_FOR_ALL_LOCATIONS;
	
	var $locationIcon = $map.find( locationQuery + '[segment="' +  segment +  '"]');
	
	var segmentToConsider = segment.trim();
	segmentToConsider = segmentToConsider.toLowerCase(); 
	$locationIcon.addClass( segmentToConsider );
	
	$locationIcon.addClass( 'strong' );
}

function resetSegmentFilter ()
{
	var $map = $( QUERY_FOR_MAP );   
	
	var locationQuery = QUERY_FOR_ALL_LOCATIONS;
	
	var $locations = $(locationQuery);
	
	//remove todas as classes
	$locations.removeClass();
	
	$locations.addClass( CLASS_FOR_LOCATION );
}

function focusVitrini( vitriniName )
{
	var $map = $( QUERY_FOR_MAP );   
	var locationQuery = QUERY_FOR_ALL_LOCATIONS;

	var vitriniNameToStore = vitriniName.trim();
	vitriniNameToStore = vitriniNameToStore.toLowerCase();

	var $vitriniLocation;
	
	for ( var index = 0; index < 5; index++ )
	{
		$vitriniLocation = $( locationQuery + '[name_' + index + '="' + vitriniNameToStore + '"]');
	
		if ( $vitriniLocation.length > 0  )
		{
			break;
		}
	}
	focusVitriniLocation( $vitriniLocation, vitriniName );
} 
 

$(document).ready( function()
{
	
	var $map = $( QUERY_FOR_MAP );
	$map.unbind('click');
	$map.bind('click', 
		function () 
		{
			var $vitriniCtner  = $('.vitriniContainer');
			$vitriniCtner.hide();
			
			var $locations = $(QUERY_FOR_ALL_LOCATIONS);
			//$locations.css('font-weight', 'initial');
			
		}
	);

	//TESTE MULTIPLOS EXP EM UM ESTANDE TODOCHRYSTIANO
	//showVitrini('barco', 'Cervejaria 1', '17', 'Acessorios');
	//showVitrini('barco', 'Cervejaria 2', '17', 'Acessorios');
	//showVitrini('barco', 'Cervejaria 3', '17', 'Acessorios');
	//showVitrini('barco', 'Cervejaria 4', '17', 'Acessorios');
	//showVitrini('barco', 'Cervejaria 5', '17', 'Acessorios');
	//showVitrini('barco', 'Cervejaria 6', '17', 'Acessorios');
	//showVitrini('barco', 'Cervejaria 7', '17', 'Acessorios');
	//showVitrini('barco', 'Cervejaria 8', '17', 'Acessorios');
	//showVitrini('barco', 'Cervejaria 9', '17', 'Acessorios');
	//showVitrini('barco', 'Cervejaria 10', '17', 'Acessorios');


	//TESTE DE SEGMENTOS
	// showVitrini('barco', 'Cervejaria 1', '158', 'acessórios');
	// showVitrini('barco', 'Cervejaria 2', '151', 'artes plásticas');
	// showVitrini('barco', 'Cervejaria 3', '152', 'artesanato contemporâneo');
	// showVitrini('barco', 'Cervejaria 4', '153', 'complementos para casa');
	// showVitrini('barco', 'Cervejaria 5', '147', 'têxtil');
	// showVitrini('barco', 'Cervejaria 6', '160', 'importados');
	// showVitrini('barco', 'Cervejaria 7', '148', 'infantil');
	// showVitrini('barco', 'Cervejaria 8', '138', 'joalheria autoral');
	// showVitrini('barco', 'Cervejaria 9', '139', 'livros');
	// showVitrini('barco', 'Cervejaria 10', '140', 'Objetos');
	// showVitrini('barco', 'Cervejaria 10', '91A', 'Mobiliário');
	// showVitrini('barco', 'Cervejaria 11', '141', 'Papelaria');
	// showVitrini('barco', 'Cervejaria 12', '142', 'Pop Art');


	/*showVitrini('bodebrown', 'Cervejaria Bode Brown', 'espaco_mais', 'Infantil');
	showVitrini('bodebrown', 'Alessandro', 'espaco_mais', 'Infantil');
	showVitrini('bodebrown', 'Marcelo', 'espaco_mais', 'Infantil');
	showVitrini('bodebrown', 'Renato', 'espaco_mais', 'Infantil');
	showVitrini('bodebrown', 'Thiago Nunes', 'espaco_mais', 'Infantil');
	showVitrini('bodebrown', 'Thiago Nunes', '80', 'Infantil');*/
	
	
	//focusVitrini('Cervejaria Barco');
	//applySegmentFilter( 'Equipamentos' );
	//applySegmentFilter( 'Cervejaria' );
	//resetSegmentFilter();*/
});


$(window).load( function ()
{
	var $loading = $('#loadingCtner');
	$loading.remove();
});
