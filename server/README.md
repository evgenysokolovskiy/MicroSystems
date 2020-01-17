1. 	Парсить данные из файла excel (/tasks/). Передать данные функциям

2. 	Выполнить первичную обработку данных (./primaryDataProcessing)
		- Схлопнуть данные по инвентарным номерам (./primaryDataProcessing/collapseDataByInn)
		- Разделить оборудование по производствам (./primaryDataProcessing/splitProductionEquipment)

3.	Использовать полученные данные в зависимости от задачи:

А.	Расчитать план ремонтов на год
		- Отфильтровать данные по лимиту аварийных остановок (./calculatePlan/_1-filterDataByEmergencyStopLimit)
		- Рассчитать трудоемкости для узлов оборудования (./calculatePlan/_2-calculateComplexityOfEquipmentNodes)
		- Рассчитать месячное значение трудоемкости (./calculatePlan/_3-calculateRepairComplexityInPlanningPeriod)
		- Рассчитать план ремонтов, дополнить объект необходимыми расчётными данными (./calculatePlan/_4-calculatePlan)

Б.	Суммировать все узлы по исходным данным (./sumNodes)

4.	Сформировать необходимый отчёт excel (./build/systemAnalysisAndPlanningRepairEquipment)

Константы (./constants)

# INDEXES - номер колонки в таблице excel

# LIMIT_NUMBER_EMERGENCY_STOPS - Предельное количество аварийных остановок для производств

# PLANNING_PERIOD -  Период планирования (число частей, например, месяцев, недель и т.д.)

# NAMES_PLANNING_PERIOD - Наименование периодов (например, месяцы, недели и т.д.)

Условия для планирования среднего ремонта:
	- Общее число узлов (механика + электрика) > LENGTH_MEDIUM_REPAIR_NODES
	- Минимальное количество узлов по механике - MIN_LENGTH_MEDIUM_REPAIR_MECHANIC_NODES
Для оборудования, не выполняющего данные условия, планируется узловой ремонт
# LENGTH_MEDIUM_REPAIR_NODES
# MIN_LENGTH_MEDIUM_REPAIR_MECHANIC_NODES