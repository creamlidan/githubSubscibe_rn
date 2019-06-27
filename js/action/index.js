import { onThemeChange } from './theme'
import { onLoadRefreshPopular, onLoadMorePopular,onFlushPopularFavorite} from './popular'
import { onLoadRefreshTrending, onLoadMoreTrending,onFlushTrendingFavorite} from './trending'
import { onLoadRefreshFavorite } from './favorite'
export default {
	onThemeChange,
	onLoadRefreshPopular,
	onLoadMorePopular,
	onFlushPopularFavorite,
	onLoadRefreshTrending,
	onLoadMoreTrending,
	onFlushTrendingFavorite,
	onLoadRefreshFavorite
}