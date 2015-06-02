/**
 * New node file
 */
var strst = '<section id="portfolio" class="portfolio">';
	strst += '<div class="container">';
	strst += '       <div class="row">';
	strst += '           <div class="col-lg-10 col-lg-offset-1 text-center">';
	strst += '               <h2>Our Work</h2>';
	strst += '               <hr class="small">';
	strst += '              <div class="row">';
                    
      
var strmd = '';

for(var i=1;i<=4;i++){
	var tempstr = ' <div class="col-md-6">';
		tempstr +=	'<div class="portfolio-item">';
		tempstr +=	'  <a href="#about">';
		tempstr +=	'       <img class="img-portfolio img-responsive" src="img/portfolio-'+i+'.jpg">';
		tempstr +=	'    </a>';
		tempstr +=	'	</div>';
		tempstr +=	'	</div>';
		
	strmd+=tempstr;
}
	
                        
var stred = ' </div>';
	stred+='<a href="#about" class="btn btn-dark">View More Items</a>';
	stred+='            </div>';
	stred+='        </div>';
	stred+='     </div>;';
	stred+='</section>;';
	

var optstr = strst + strmd + stred;
