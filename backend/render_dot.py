import graphviz

# Load the dot file
dot_file = './my_project.dot'
graph = graphviz.Source.from_file(dot_file)

# Render the graph
graph.render('output', format='png')