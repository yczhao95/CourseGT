var num_checkbox=2;
var specification;

function myFunction() {
  specification = document.getElementById("mySelect").value;
  console.log(specification);
  
  $("span.rp").replaceWith('<span class="rp">' + specification + '</span>');
  
  if(specification === "CPR") {
      
      $("header.test").replaceWith('<header  class="test">'+
    '<p>Algorithms: Pick one (1) of:</p>'+    
        changetoHTML(json_data, "CPR", "core","first") +
    '<p>And pick one of:</p>'+
        changetoHTML(json_data, "CPR", "core","second") +
    '<p>Pick three (3) courses from Perception and Robotics, with at least one course from each.</p>'+
    '<p>Perception</p>'+
         changetoHTML(json_data, "CPR", "electives","first") +
    '<p>Robotics</p>'+
        changetoHTML(json_data, "CPR", "electives","second") +
    '</header>');
    
    
  } else if(specification === "CG") {
      
    $("header.test").replaceWith('<header  class="test">'+
    '<p>Algorithms: Pick one (1) of:</p>'+    
        changetoHTML(json_data, "CG", "core","first") +
    '<p>And pick one of:</p>'+
        changetoHTML(json_data, "CG", "core","second") +
    '<p>Pick three (3) courses from Perception and Robotics, with at least one course from each.</p>'+
         changetoHTML(json_data, "CG", "electives","") +
    '</header>');
      
  } else if(specification === "CS") {
      
     $("header.test").replaceWith('<header  class="test">'+
    '<p>Algorithms: Pick one (1) of:</p>'+    
        changetoHTML(json_data, "CS", "core","first") +
    '<p>And pick two of:</p>'+
        changetoHTML(json_data, "CS", "core","second") +
    '<p>Pick three (3) courses from</p>'+
         changetoHTML(json_data, "CS", "electives","") +
    '</header>');
      
  } else if(specification === "HCC") {
      
      $("header.test").replaceWith('<header class="test">'+
    '<p>Core Courses: Pick three of:</p>'+    
        changetoHTML(json_data, "HCC", "core","") +
    '<p>And pick two of:</p>'+
        changetoHTML(json_data, "HCC", "electives","") +
    '</header>');
      
  } else if(specification === "HPC") {
      
       $("header.test").replaceWith('<header class="test">'+
    '<p>Core Courses: Pick two of:</p>'+    
        changetoHTML(json_data, "HPC", "core","") +
    '<p>And pick three of:</p>'+
        changetoHTML(json_data, "HPC", "electives","") +
    '</header>');
      
  } else if(specification === "HCI") {
       $("header.test").replaceWith('<header class="test">'+
    '<p>Core Courses: Pick two of:</p>'+    
        changetoHTML(json_data, "HCI", "core","") +
    '<p>Pick three (3) courses from the two sub-areas below, including at least one from each sub-area:</p>'+
    '<p>Sub-area: Design and evaluation concepts</p>'+
        changetoHTML(json_data, "HCI", "electives","first") +
    '<p>Sub-area: Interactive technology</p>'+
        changetoHTML(json_data, "HCI", "electives","second") +
    '</header>');
  } else if(specification === "II") {
        $("header.test").replaceWith('<header class="test">'+
    '<p>Core Courses: Take one (1) course from:</p>'+   
    '<p>Algorithms and Design</p>'+   
        changetoHTML(json_data, "II", "core","first") +
    '<p>And, two (2) courses from:</p>'+   
        changetoHTML(json_data, "II", "core","second") +

    '<p>Pick two (2) courses from:</p>'+
    '<p>Sub-area: Interaction</p>'+
        changetoHTML(json_data, "II", "electives","first") +
    '<p>Sub-area: Cognition</p>'+
        changetoHTML(json_data, "II", "electives","second") +
    '</header>');
  } else if(specification === "ML") {
      $("header.test").replaceWith('<header class="test">'+
    '<p>Core Courses: Algorithms: Pick one (1) of:</p>'+   
        changetoHTML(json_data, "ML", "core","first") +
    '<p>And, pick one (1) of:</p>'+   
        changetoHTML(json_data, "ML", "core","second") +
    '<p>Pick three (3) of:</p>'+
        changetoHTML(json_data, "ML", "electives","") +
    '</header>');
  } else if(specification === "MS") {
       $("header.test").replaceWith('<header  class="test">'+
    '<p>Core Courses: </p>'+   
        changetoHTML(json_data, "MS", "core","first") +
    '<p>And, pick one (1) of:</p>'+   
        changetoHTML(json_data, "MS", "core","second") +
    '<p>Pick three (3) of:</p>'+
        changetoHTML(json_data, "MS", "electives","") +
    '</header>');
  } else if(specification === "SC-1") {
      
       $("header.test").replaceWith('<header  class="test">'+
    '<p>Core Courses: </p>'+   
        changetoHTML(json_data, "SC-1", "core","first") +
    '<p>Pick one (1) of:</p>'+   
        changetoHTML(json_data, "SC-1", "core","second") +
    '<p>Pick three (3) of:</p>'+
        changetoHTML(json_data, "SC-1", "electives","") +
    '</header>');
      
      
  } else if(specification === "SC-2") {
      
       $("header.test").replaceWith('<header  class="test">'+
    '<p>Core Courses: Pick one (1) of:</p>'+   
        changetoHTML(json_data, "SC-2", "core","first") +
    '<p>Pick one (1) of:</p>'+   
        changetoHTML(json_data, "SC-2", "core","second") +
    '<p>Pick three (3) more classes including additional classes from the above and:</p>'+
        changetoHTML(json_data, "SC-2", "electives","") +
    '</header>');
      
      
  } else if(specification === "VA") {
      
       $("header.test").replaceWith('<header  class="test">'+
    '<p>Core Courses:</p>'+   
        changetoHTML(json_data, "VA", "core","first") +
    '<p>Pick one (1) of:</p>'+   
        changetoHTML(json_data, "VA", "core","second") +
    '<p>Pick three from:</p>'+
        changetoHTML(json_data, "SC-2", "electives","") +
    '</header>');
      
      
  } else {
      
       $("header.test").replaceWith('<header  class="test">'+
    '</header>');
      
  }
 
 
}