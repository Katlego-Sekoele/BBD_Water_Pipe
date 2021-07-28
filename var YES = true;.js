var YES = true;
var NO = false;

if(YES)
{
    alert("");
}

if(NO)
{
    alert("");
}

class pipe_type{
    constructor(standard_pipe,bend_pipe){
        this.standard_pipe= standard_pipe;
        this.bend_pipe= bend_pipe ;
    }
}

class Direction{
    constructor(single_direction_multi_pipe,dual_direction_multi_pipe){
        this.single_direction_multi_pipe;
        this.dual_direction_multi_pipe;
    }
}

class Purifiers{
    constructor(purifier,purity_checker){
        this.purifier;
        this.purity_checker
    }
}

class Water{
    constructor(water,pipe_type,clean_unclean){
        this.water = water;
        this.pipe_type = pipe_type;
        this.clean_unclean = int(clean_unclean);
    }

    if (clean_unclean = 0){
        water = "clean"
    }
    
    if (clean_unclean >=0){
        water = "unclean"
    }

}
