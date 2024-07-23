import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { Character } from '@/types/rickandmorty/people'
import { Cell, Pie, PieChart } from 'recharts'

export const SpeciesChart = ({ data }: { data: Character[] }) => {
  type SpeciesType = 'Human' | 'Alien' | 'Robot' | 'Other'
  const speciesCount: { [key: string]: number } = {}

  // Define color mapping
  const speciesColors: Record<SpeciesType, string> = {
    Human: '#ff7300',
    Alien: '#387908',
    Robot: '#9b8e23',
    Other: '#ff6f61'
  }

  // Iterate through each character
  data.forEach((character: Character) => {
    const species = character.species

    // Increment the count for the species
    if (speciesCount[species]) {
      speciesCount[species]++
    } else {
      speciesCount[species] = 1
    }
  })

  // Convert the result into an array of objects
  const chartDataSpecies = Object.keys(speciesCount).map((species) => ({
    species:
      (species as SpeciesType) in speciesColors
        ? (species as SpeciesType)
        : 'Other',
    count: speciesCount[species]
  }))

  const chartConfigSpecies = {
    species: {
      label: 'Species',
      color: 'hsl(var(--primary))'
    }
  } satisfies ChartConfig

  // Function to get color based on species
  const getColor = (species: SpeciesType): string => {
    return speciesColors[species] || speciesColors['Other']
  }

  return (
    <ChartContainer
      config={chartConfigSpecies}
      className='m-auto flex max-h-[400px] min-h-[200px] w-full overflow-visible'
    >
      <PieChart accessibilityLayer data={chartDataSpecies}>
        <Pie
          data={chartDataSpecies}
          dataKey='count'
          nameKey='species'
          innerRadius={60}
          outerRadius={80}
          label={({ name, value }) => `${name}: ${value}`}
        >
          {chartDataSpecies.map(
            (
              entry: {
                species: SpeciesType
                count: number
              },
              index
            ) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.species)} />
            )
          )}
        </Pie>
        <ChartTooltip content={<ChartTooltipContent />} />
      </PieChart>
    </ChartContainer>
  )
}
