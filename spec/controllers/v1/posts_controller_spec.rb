# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::PostsController, type: :controller do
  let!(:user) { create(:user) }
  let!(:posting) { create(:post) }
  let!(:comment) { create(:comment, :for_post, commentable: posting, user: user) }
  let!(:comment_reply) { create(:comment, :comment_reply, commentable: comment, user: user) }

  describe 'GET index' do
    let(:response_parsed) { JSON.parse(response.body) }

    it 'has a 200 status code' do
      get :index
      expect(response.status).to eq(200)
    end

    it 'responds to json format' do
      get :index
      expect(response.content_type).to eq 'application/json; charset=utf-8'
    end

    it 'returns error no posts found when there is no post' do
      Post.destroy_all

      get :index
      expect(response.body).to eq('{"error":"No posts found"}')
    end

    it 'returns post' do
      posts = Post.all

      get :index
      expect(response_parsed.first['id']).to eq(posts.first.id)
    end
  end

  describe 'GET show' do
    let(:response_parsed) { JSON.parse(response.body) }

    it 'has a 200 status code' do
      get :show, params: { id: '1' }
      expect(response.status).to eq(200)
    end

    it 'responds to json format' do
      get :show, params: { id: '1' }
      expect(response.content_type).to eq 'application/json; charset=utf-8'
    end

    it 'returns error no posts found when there is no post' do
      Post.destroy_all

      get :show, params: { id: '1' }
      expect(response_parsed['error']).to eq('No post found')
    end

    it 'returns post' do
      check_post = Post.find_by(id: posting.id)

      get :show, params: { id: posting.id }
      expect(response_parsed['content']).to eq(check_post.content)
    end
  end

  describe 'POST create' do
    let(:response_parsed) { JSON.parse(response.body) }
    let!(:user) { create(:user) }
    let(:content) { FFaker::Lorem.paragraph }
    let(:create_params) do
      {
        user_id: user.id,
        content: content,
      }
    end

    context 'without a user' do
        it 'returns a 422 status' do
            post :create, params: { content: FFaker::Lorem.paragraph }
            expect(response.status).to eq(422)
        end
    end

    context 'with user' do
        before { post(:create, params: create_params) }

        it 'creates and returns the post' do
            expect(response).to have_http_status(:success)
            expect(response_parsed['content']).to eq(content)
        end
    end
  end

  describe 'PUT update' do
    let(:response_parsed) { JSON.parse(response.body) }
    let!(:user) { create(:user) }
    let!(:posting) { create(:post) }
    let(:content) { FFaker::Lorem.paragraph }
    let(:update_params) do
      {
        id: posting.id,
        content: content,
      }
    end

    context 'with wrong post id' do
        it 'returns a 402 status' do
            put(:update, params: { id: 123, content: content })
            expect(response.status).to eq(404)
        end
    end

    context 'sending post id' do
        before { put(:update, params: update_params) }

        it 'creates and returns the post' do
            expect(response).to have_http_status(:success)
            expect(response_parsed['content']).to eq(content)
        end
    end
  end

  describe 'DELETE destroy' do
    let(:response_parsed) { JSON.parse(response.body) }
    let!(:user) { create(:user) }
    let!(:posting) { create(:post) }
    let(:destroy_params) do
      {
        id: posting.id,
      }
    end

    context 'with wrong post id' do
        it 'returns a 402 status' do
            delete(:destroy, params: { id: 123 })
            expect(response.status).to eq(404)
        end
    end

    context 'sending post id' do
        before { delete(:destroy, params: destroy_params) }

        it 'creates and returns the post' do
            expect(response).to have_http_status(:no_content)
        end
    end
  end
end
