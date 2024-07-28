import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import type { ChartConfig } from '@/components/ui/chart'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import type { Character } from '@/types/rickandmorty/people'

export const EpisodesChart = ({ data }: { data: Character[] }) => {
  const chartDataEpsiodes = data.map((character: Character) => ({
    name: character.name,
    episodes: character.episode.length
  }))

  const chartConfigEpisodes = {
    episodes: {
      label: 'Episodes',
      color: 'hsl(var(--primary))'
    }
  } satisfies ChartConfig

  return (
    <ChartContainer
      config={chartConfigEpisodes}
      className='max-h-[400px] min-h-[200px] w-full'
    >
      <BarChart accessibilityLayer data={chartDataEpsiodes}>
        <CartesianGrid vertical={false} />
        <Bar dataKey='episodes' fill={chartConfigEpisodes.episodes.color} />
        <YAxis />
        <XAxis
          dataKey='name'
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => value.slice(0, 10)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
      </BarChart>
    </ChartContainer>
  )
}
