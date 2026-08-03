package com.ytplayables.app

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageButton
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import coil.load
import coil.transform.RoundedCornersTransformation
import java.util.Locale

class GameGridAdapter(
    private val games: MutableList<GameMeta>,
    private val onGameClick: (GameMeta) -> Unit
) : RecyclerView.Adapter<GameGridAdapter.ViewHolder>() {

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val thumbnail: ImageView = view.findViewById(R.id.game_thumbnail)
        val title: TextView = view.findViewById(R.id.game_title)
        val description: TextView = view.findViewById(R.id.game_description)
        val genre: TextView = view.findViewById(R.id.game_genre)
        val popularity: TextView = view.findViewById(R.id.game_popularity)
        val favoriteBtn: ImageButton = view.findViewById(R.id.btn_favorite)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_game_card, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val game = games[position]
        holder.title.text = game.title
        holder.description.text = game.description
        holder.genre.text = game.genre.firstOrNull() ?: ""
        holder.popularity.text = "Popularity: ${game.popularity}"

        holder.thumbnail.load("${YTPlayablesApplication.BASE_URL}/images/games/${game.id}/thumbnail.webp") {
            placeholder(R.drawable.bg_canvas_soft_2)
            error(R.drawable.bg_canvas_soft_2)
            crossfade(true)
            transformations(RoundedCornersTransformation(8f))
        }

        holder.favoriteBtn.setOnClickListener {
            val isFav = YTPlayablesApplication.instance.isFavorite(game.id)
            if (isFav) {
                YTPlayablesApplication.instance.removeFavorite(game.id)
                holder.favoriteBtn.setImageResource(R.drawable.ic_favorite_border)
                holder.favoriteBtn.setColorFilter(holder.itemView.context.getColor(R.color.text_muted))
            } else {
                YTPlayablesApplication.instance.addFavorite(game.id)
                holder.favoriteBtn.setImageResource(R.drawable.ic_favorite)
                holder.favoriteBtn.setColorFilter(holder.itemView.context.getColor(R.color.accent))
            }
        }

        holder.itemView.setOnClickListener {
            onGameClick(game)
        }
    }

    override fun getItemCount(): Int = games.size

    fun updateGames(newGames: List<GameMeta>) {
        val oldSize = games.size
        games.clear()
        games.addAll(newGames)
        if (oldSize == 0) {
            notifyDataSetChanged()
        } else {
            notifyItemRangeChanged(0, games.size)
        }
    }
}

data class GameMeta(
    val id: String,
    val title: String,
    val description: String,
    val genre: List<String>,
    val popularity: Int
)