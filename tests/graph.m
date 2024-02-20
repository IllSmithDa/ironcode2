classdef Graph
  properties
    graphMap
  end
    
  methods
    function obj = Graph()
      obj.graphMap = containers.Map();
    end
        
    function addNode(obj, val)
      obj.graphMap(val) = {};
    end
        
    function addVertices(obj, node1, node2)
      if ~isKey(obj.graphMap, node1)
          obj.graphMap(node1) = {};
      end
      if ~isKey(obj.graphMap, node2)
          obj.graphMap(node2) = {};
      end

      obj.graphMap(node1) = [obj.graphMap(node1), node2];
      obj.graphMap(node2) = [obj.graphMap(node2), node1];
    end
        
    function breadthTraverse(obj, start)
      queue = {start};
      visited = containers.Map(start, true);
      while ~isempty(queue)
        val = queue{1};
        disp(val);

        queue(1) = [];
        tempArr = obj.graphMap(val);
        
        for i = 1:length(tempArr)
          if ~visited.isKey(tempArr{i})
            queue = [queue, tempArr{i}];
            visited(tempArr{i}) = true;
          end
        end
      end
    end

    function depthTraverse(obj, start)
      stack = {start};
      visited = containers.Map(start, true);
      while ~isempty(stack)
        val = stack{end};
        disp(val);
            
        stack(end) = [];
        tempArr = obj.graphMap(val);
            
        for i = 1:length(tempArr)
          if ~visited.isKey(tempArr{i})
            stack = [stack, tempArr{i}];
            visited(tempArr{i}) = true;
          end
        end
      end
    end
  end
end