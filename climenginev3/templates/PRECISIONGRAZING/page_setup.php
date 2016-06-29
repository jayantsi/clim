{% include 'PRECISIONGRAZING/navigation.html'%}
<!----------------------------->
<!--        TITLE --> 
<!----------------------------->
<p style="text-align:center"><span style="color:blue;font-size:40pt;">
	Remotely Sensed Precision Grazing
</span></p>

<!----------------------------->
<!--        HEADER PICTURE --> 
<!----------------------------->
<img src='/templates/PRECISIONGRAZING/images/grazing.jpg' width="100%">

<!----------------------------->
<!--        NAVIGATION       -->
<!----------------------------->
<ul class="nav nav-tabs navbar-inverse">
	<li><a href="#intro" data-toggle="tab">Introduction</a></li>
	<li class="active"><a href="#data" data-toggle="tab">DATA TOOL</a></li>
	<li><a href="#model" data-toggle="tab">Our Model</a></li>
	<li class="nav navbar-right"><a href="#contact" data-toggle="tab">CONTACT</a></li>
</ul>
<div class="tab-content">
	<div class="tab-pane" id="intro">
		{% include 'PRECISIONGRAZING/intro.html'%}
	</div>
	<div class="tab-pane active" id="data">
		{%include 'PRECISIONGRAZING/datatool_setup.php'%}
	</div>
	<div class="tab-pane" id="model">
		{%include 'PRECISIONGRAZING/model.html'%}
	</div>
	<div class="tab-pane" id="contact">
		{% include 'PRECISIONGRAZING/contact.html'%}
	</div>

</div>
