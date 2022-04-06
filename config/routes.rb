Rails.application.routes.draw do
  
  scope :api do
    resources :users
    get '/', to: 'application#server'
    post '/signup', to: 'users#create'
    post '/login', to: 'authenticate#create'
    get '/profile', to: 'authenticate#profile'
    post '/presigned_url', to: 'direct_upload#create'
  end

end
