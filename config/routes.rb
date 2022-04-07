Rails.application.routes.draw do
  
  scope :api do
    resources :users, only: [:index, :create, :update, :destroy]
    resources :users, only: [:show] do
      resources :posts, only: [:index]
    end
    resources :posts, only: [:index, :show, :create, :destroy]
    resources :comments, only: [:create, :destroy]
    get '/', to: 'application#server'
    post '/signup', to: 'users#create'
    post '/login', to: 'authenticate#create'
    get '/profile', to: 'authenticate#profile'
    post '/presigned_url', to: 'direct_upload#create'
  end

end
