import { Cell, Pie, PieChart } from 'recharts'

import type { ChartConfig } from '@/components/ui/chart'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { Skeleton } from '@/components/ui/skeleton'
import type { Character } from '@/types/rickandmorty/people'

export const SpeciesChart = ({ data }: { data?: Character[] }) => {
  type SpeciesType =
    | 'Human'
    | 'Alien'
    | 'Robot'
    | 'Mythological Creature'
    | 'Humanoid'
    | 'Disease'
    | 'Other'
  const speciesCount: { [key: string]: number } = {}

  // Define color mapping
  const speciesColors: Record<SpeciesType, string> = {
    Human: 'darksalmon',
    Alien: 'green',
    Robot: 'grey',
    'Mythological Creature': 'purple',
    Disease: 'lightgreen',
    Humanoid: 'pink',
    Other: 'lightgrey'
  }

  // Iterate through each character
  data?.forEach((character: Character) => {
    const { species } = character
    // Increment the count for the species
    if (speciesCount[species]) {
      speciesCount[species] += 1
    } else {
      speciesCount[species] = 1
    }
  })

  // Convert the result into an array of objects
  const chartDataSpecies = Object.keys(speciesCount)
    .map((species) => ({
      species:
        (species as SpeciesType) in speciesColors
          ? (species as SpeciesType)
          : 'Other',
      count: speciesCount[species]
    }))
    .flat()

  const chartConfigSpecies = {
    species: {
      label: 'Species',
      color: 'hsl(var(--primary))'
    }
  } satisfies ChartConfig

  // Function to get color based on species
  const getColor = (species: SpeciesType): string => {
    return speciesColors[species] || speciesColors.Other
  }

  if (!chartDataSpecies) return <Skeleton className='size-80' />

  return (
    <>
      <h1 className='mx-auto'>Species</h1>
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
    </>
  )
}
