

<h1>Assignment 2: <p> Hierarchical Modeling: Modeling and Animating a Quadruped Animal</p></h1>
<hr>
<center>

<b>Due Date: 5 April Thursday, 2018</b>
<p>
<b>Demo will be between during class hour (13:40-15:30) in EB-204.
You can use your laptops for demo. </b>
</p><p>

</p></center>

<hr>
<a name="requirements" <="" a="">
<h3>Requirements</h3>

You can form groups of 2 for this homework.

<p>

You are supposed to implement a 2-D hierarchical model for modeling and 
animating a quadruped animal (e.g., dog, cat, lion, fox, wolf, tiger, cow,
ship, or bunny). You will use a matrix stack and the WebGL procedures 
(traversal algorithms) that are used to traverse the hierarchy representing 
the articulated figure by using the matrix stack that we have discussed in class. 

</p><p>

Essentially, you will write a sequence of function calls with appropriate
transformations and transformation parameters and when you execute that
segment, it should produce a hierarchical model of the quadruped animal.
When we change the model parameters, it should behave accordingly. You 
will also animate your models by changing the model parameters gradually. 
The animations should be user-specifiable and should not be hard-coded 
in your program. Your primitives will be 2D rectangles and ellipsoids 
for appropriate parts.

</p><p>
Build a user interface to display and animate your model. Also define some 
buttons/sliders for giving transformation parameters for joint angles, and 
so on. I should easily be able to give a posture to your character using 
your interface and set up an animation using the interface by defining 
keyframes of an animation.

<b>You should demonstrate a sample animation of some behavior, such as walking,
jumping, running, or a more complex behavior. This should be prepared before 
the demo.
</b>
You could save your animations in the form of keyframes (joint parameters)
so that you can load and play different animations. You should implement 
save/load procedures for this purpose. 
</p><p>
Grading will be based on the essential functionality, and speed and quality 
of the animations. <b>I will construct a sample animation using your user 
interface. Thus, I should be able to select joint parameters for the model,
specify their values, and save them as keyframes. I should be able to give a
global position to the model too. After specifying the keyframes, your program 
will interpolate the joint parameters between the keyframes and display the 
model for each frame.</b>
</p><p>

Look at the documentation about OpenGL and Web GL for implementation details 
of data types and the functions that are used to manipulate hierarchies.
</p><p>
<b>Optional:</b> 
</p><p>
You can implement the 3D version with the following primitives:
</p><ul>
<li> Rectangular prisms (with two control points)
</li><li> Cylinders (with two control points)
</li><li> Spheres
</li></ul>
<p>
If you implement the optional part, you must use a projection transformation 
for 3D to 2D conversion (either glOrtho() procedure for orthographic projection
or glPerspective() for perspective projection). 
</p><p>
Besides you can map a fur texture to your animals to get a realistic appearance.

</p><p>
Look at the documentation about OpenGL and WebGL for implementation details of data 
types and the functions that are used to manipulate hierarchies.



</p></a></body></html>
