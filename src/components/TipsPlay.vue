<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button variant="outline" px-3>
          查看玩法
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p><strong>推箱子怎样玩 : </strong>把箱子绕过障碍物，推到指定的位置，但是所有的箱子只能推，不<br>能拉，而且一次只能推动一个，所有指定位置都有箱子就算获胜了</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
